[hashtable]$result = $null
[hashtable]$font = @{ FontFamily = '微软雅黑'; FontColor = '#333'; FontSize=13 }
$folder = "./"
$extensions = "wmv","m4a","wma","mp3","ts","m3u8"
$result = Show-AnyBox @font -Title 'ffmpeg格式转换' -WindowStyle 'None'  -BackgroundColor '#b2b2b2'  -MinWidth 350 -Buttons 'Exit', 'Go' -CancelButton 'Exit' -DefaultButton 'Go' -Prompt @(
  (New-AnyBoxPrompt -Message '转换到：' -ValidateSet '视频[mp4]', '音频[m4a]', '音频[mp3]' -DefaultValue '音频[m4a]' -ShowSetAs 'Radio_Wide' -Name  'convertype'  -ShowSeparator),
  (New-AnyBoxPrompt -InputType 'FileOpen' -Message '源文件:'  -Name  'filepath' -ValidateNotEmpty -ReadOnly),
  (New-AnyBoxPrompt -InputType 'FolderOpen' -Message '输出[默认当前文件夹]:' -Name  'dstfolder' -ReadOnly )

)
if($result.Exit){exit}
if($result.Go){
    $convertype = $result.convertype
    if(-not $convertype){$convertype="音频[m4a]"}
    $filepath = $result.filepath
    if(-not $filepath){
        "请选择源文件"
        exit
    }
    
    if($result.dstfolder){
        $folder = $result.dstfolder
    }
    $matchs = $filepath.split("\")
    if(-not $matchs){
        "源文件格式不支持！"
        exit
    }
    $filename = $matchs[$matchs.Length-1]
    $matchs = $filename.split(".")
    $filetype = $matchs[$matchs.Length-1]
    $dst_filename = $filename.replace(".$filetype",'')
    
    if($extensions.Contains($filetype)){
        "视频格式转换：[ $filetype - $convertype]"
        "输出位置：[ $folder ] "
        "当前处理文件：[$filepath]"
        if ( $convertype -eq "音频[m4a]" ) { 
            ffmpeg.exe -i $filepath  -c:a aac -q:a 1   "$folder/$dst_filename.m4a" -loglevel error   
        }
        elseif ( $convertype -eq '视频[mp4]' ) { 
            
            ffmpeg.exe -i $filepath  -c:v copy -c:a copy -y  "$folder/$dst_filename.mp4" -loglevel error  
        }
        elseif ( $convertype -eq '音频[mp3]' ) { 
            
            ffmpeg.exe -i $filepath   -acodec libmp3lame -q:a 1  "$folder/$dst_filename.mp3" -loglevel error  
        }
        else{
            "不支持的格式：$convertype"
        }
        "转换完成!"
    }
    
    
}
