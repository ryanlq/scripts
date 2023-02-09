[hashtable]$result = $null
[hashtable]$font = @{ FontFamily = '微软雅黑'; FontColor = '#000'; FontSize=13 }
$folder = "./"
$extensions = "wmv","m4a","wma","mp3","ts","m3u8",'wav','flac',"flv","m4s"
$result = Show-AnyBox @font -Title 'ffmpeg格式转换' -WindowStyle 'None'  -BackgroundColor '#00896C'  -MinWidth 350 -Buttons 'Exit', 'Go' -CancelButton 'Exit' -DefaultButton 'Go' -Prompt @(
  (New-AnyBoxPrompt -Message '要处理的文件类型：' -ValidateSet $extensions -ShowSeparator -Name  'srctype' -ValidateNotEmpty),
  (New-AnyBoxPrompt -Message '转换到：' -ValidateSet 'mp4', 'm4a', 'mp3' -DefaultValue 'm4a' -ShowSetAs 'Radio_Wide' -Name  'convertype'  -ShowSeparator),
  (New-AnyBoxPrompt -InputType 'FolderOpen' -Message '源文件夹:' -Name  'srcfolder' -ValidateNotEmpty -ReadOnly )
  (New-AnyBoxPrompt -InputType 'FolderOpen' -Message '输出[默认源文件夹]:' -Name  'dstfolder' -ReadOnly )
)
function Go ($option) {
    if(-not $option){exit}
    else{
        $srcfolder = $option.srcfolder
        $convertype = $option.convertype
        $dstfolder = $option.dstfolder
        $srctype = $option.srctype
        
        if(-not $dstfolder) {$dstfolder = $srcfolder}
        if(-not $convertype) {$convertype = "m4a"}

        $files = (Get-ChildItem -Path $srcfolder -Recurse -Include *.$srctype)
        
        "格式转换：[ $srctype - $convertype]"
        "位置输出：[ $srcfolder -> $dstfolder ] "

        foreach($file in $files)
        {
            $name = $file.Name
            $matchs = $name.split(".")
            $dstname = $matchs[0]
            $dstname = "$dstname.$convertype"
            convert $convertype "$srcfolder\$name" "$dstfolder\$dstname"
        }
    }
}

function convert ($type,$from,$to) {
    "处理[$from]"
    if ( $type -eq "m4a" ) { 
        ffmpeg.exe -i $from  -codec copy $to   -threads 5 -preset ultrafast  -loglevel error   
    }
    elseif ( $type -eq 'mp4' ) { 
        
        ffmpeg.exe -i $from  -c:v copy -c:a copy -y $to  -threads 4 -preset ultrafast  -loglevel error  
    }
    elseif ( $type -eq 'mp3' ) { 
        
        ffmpeg.exe -i $from  -c:a aac -b:a 192k  $to  -threads 4 -preset ultrafast  -loglevel error  
    }
    elseif ( $type -eq 'm4aa' ) { 
        
        ffmpeg.exe -i $from  -c:a aac -q:a 1 $to   -threads 4 -preset ultrafast  -loglevel error   
    }
    else{
        "不支持的格式：$type"
    }
}



if($result.Exit){exit}
if($result.Go){ Go $result }
