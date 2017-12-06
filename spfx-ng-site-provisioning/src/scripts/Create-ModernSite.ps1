Import-Module "D:\home\site\wwwroot\modules\SharePointPnPPowerShellOnline.psd1" -Global

#-----------------------------------------------------------------------
# Initialization & Configuration
#-----------------------------------------------------------------------
$CurrentProgressPreference = $ProgressPreference
$ProgressPreference = 'SilentlyContinue'

#-----------------------------------------------------------------------
# Getting the value from the POST Request
#-----------------------------------------------------------------------
$RequestBody = Get-Content $req -Raw | ConvertFrom-Json

#-----------------------------------------------------------------------
# Connecting to the Microsoft Graph
#-----------------------------------------------------------------------
Connect-PnPMicrosoftGraph -AppId $env:AppId -AppSecret $env:AppSecret -AADDomain $env:AADDomain

#-----------------------------------------------------------------------
# Creating a new Unified Group
#-----------------------------------------------------------------------
$group = New-PnPUnifiedGroup -DisplayName $RequestBody.title -Description $RequestBody.description -MailNickName $RequestBody.url -Owners $env:AdminUsername -IsPrivate:$($RequestBody.private) -Force

if($RequestBody.template) {
    #-----------------------------------------------------------------------
    # Building the Credentials
    #-----------------------------------------------------------------------
    $SecuredPassword = ConvertTo-SecureString $env:AdminPassword -AsPlainText -Force
    $Credentials = New-Object System.Management.Automation.PSCredential($env:AdminUsername, $SecuredPassword)

    #-----------------------------------------------------------------------
    # Applying the Template
    #-----------------------------------------------------------------------
    Connect-PnPOnline -Url "$($env:TenantUrl)/sites/$($RequestBody.url)" -Credentials $Credentials
    Apply-PnPProvisioningTemplate -Path $RequestBody.templateUrl
}

#-----------------------------------------------------------------------
# Set the ProgressPreference to the saved ProgressPreference
#-----------------------------------------------------------------------
$ProgressPreference = $CurrentProgressPreference

$Site = @{
    id = $group.GroupId
    title = $group.DisplayName
    description = $group.Description
    email = $group.Mail
    url = "$($env:TenantUrl)/_layouts/15/groupstatus.aspx?id=$($group.GroupId)&target=site"
}

$ResultJson = $Site | ConvertTo-Json -Depth 5
$ResultJson | Out-File -Encoding ASCII -FilePath $res
