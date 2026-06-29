param(
    [switch]$NoBuild
)

$ServiceMap = @{
    "auth-service"      = "auth"
    "user-service"      = "user"
    "master-service"    = "master"
    "vendor-service"    = "vendor"
    "contracts-service" = "contracts"
    "request-service"   = "request"
    "shipment-service"  = "shipment"
    "api-gateway"       = "gateway"
}

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

if (-not $NoBuild) {
    Write-Host "Building all services first..." -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed! Aborting." -ForegroundColor Red
        exit 1
    }
}

$wt = Get-Command "wt.exe" -ErrorAction SilentlyContinue

if ($wt) {
    $first = $true
    foreach ($svc in $ServiceMap.Keys) {
        $short = $ServiceMap[$svc]
        $title = "optima-$short"
        $scriptCmd = "title $title && npm run start:$short"
        if ($first) {
            wt.exe new-tab --title "$title" --startingDirectory "$Root" cmd /k "$scriptCmd"
            $first = $false
        } else {
            wt.exe -w 0 new-tab --title "$title" --startingDirectory "$Root" cmd /k "$scriptCmd"
        }
        Start-Sleep -Milliseconds 400
    }
} else {
    foreach ($svc in $ServiceMap.Keys) {
        $short = $ServiceMap[$svc]
        $title = "optima-$short"
        $scriptCmd = "title $title && cd /d `"$Root`" && npm run start:$short"
        Start-Process cmd -ArgumentList "/k", $scriptCmd -WindowStyle Normal
        Start-Sleep -Milliseconds 800
    }
}

Write-Host "All services launched!" -ForegroundColor Green
Write-Host "Close terminal windows/tabs to stop all services." -ForegroundColor Yellow
