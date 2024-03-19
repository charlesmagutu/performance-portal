$apiUrl = "http://127.0.0.1:8000/server/"
$logFilePath = "C:\Users\condabu\Documents\Development\performance-portal\server_update.log"

while ($true) {
    try {
        # Collect server information
        $serverInfo = @{
            ServerID = $env:COMPUTERNAME
            ServerName = $env:COMPUTERNAME
            IPAddress = (Test-Connection -ComputerName $env:COMPUTERNAME -Count 1).IPV4Address.IPAddressToString
            Location = "Datacenter B"
            OS = (Get-WmiObject -Class Win32_OperatingSystem).Caption
            CPU = (Get-WmiObject -Class Win32_Processor).Name
            MemoryGB = [math]::Round((Get-WmiObject -Class Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 2)
            StorageGB = [math]::Round((Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='C:'" | Select-Object -ExpandProperty Size) / 1GB, 2)
            Status = "Inactive"
            LastUpdated = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
        }
        
        # Convert server info to JSON
        $jsonPayload = $serverInfo | ConvertTo-Json

        # Invoke the API endpoint with the server information
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $jsonPayload -ContentType "application/json"

        $timeStamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        "$timeStamp - $($response.message -replace "`r`n", " ")`r`n" | Out-File -FilePath $logFilePath -Append -Encoding utf8

        Write-Host "Server information updated successfully"
    }
    catch {
        $timeStamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        "$timeStamp - $($_.Exception.Message -replace "`r`n", " ")`r`n" | Out-File -FilePath $logFilePath -Append -Encoding utf8
        Write-Error "Failed to update server information: $_"
    }

    # Delay for 5 seconds before the next iteration
    Start-Sleep -Seconds 5
}
