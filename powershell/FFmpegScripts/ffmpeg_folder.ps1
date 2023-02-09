[hashtable]$result = $null
[hashtable]$font = @{ FontFamily = '΢���ź�'; FontColor = '#000'; FontSize=13 }
$folder = "./"
$extensions = "wmv","m4a","wma","mp3","ts","m3u8",'wav','flac',"flv","m4s"
$result = Show-AnyBox @font -Title 'ffmpeg��ʽת��' -WindowStyle 'None'  -BackgroundColor '#00896C'  -MinWidth 350 -Buttons 'Exit', 'Go' -CancelButton 'Exit' -DefaultButton 'Go' -Prompt @(
  (New-AnyBoxPrompt -Message 'Ҫ������ļ����ͣ�' -ValidateSet $extensions -ShowSeparator -Name  'srctype' -ValidateNotEmpty),
  (New-AnyBoxPrompt -Message 'ת������' -ValidateSet 'mp4', 'm4a', 'mp3' -DefaultValue 'm4a' -ShowSetAs 'Radio_Wide' -Name  'convertype'  -ShowSeparator),
  (New-AnyBoxPrompt -InputType 'FolderOpen' -Message 'Դ�ļ���:' -Name  'srcfolder' -ValidateNotEmpty -ReadOnly )
  (New-AnyBoxPrompt -InputType 'FolderOpen' -Message '���[Ĭ��Դ�ļ���]:' -Name  'dstfolder' -ReadOnly )
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
        
        "��ʽת����[ $srctype - $convertype]"
        "λ�������[ $srcfolder -> $dstfolder ] "

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
    "����[$from]"
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
        "��֧�ֵĸ�ʽ��$type"
    }
}



if($result.Exit){exit}
if($result.Go){ Go $result }
