[hashtable]$result = $null
[hashtable]$font = @{ FontFamily = '΢���ź�'; FontColor = '#333'; FontSize=13 }
$folder = "./"
$extensions = "wmv","m4a","wma","mp3","ts","m3u8"
$result = Show-AnyBox @font -Title 'ffmpeg��ʽת��' -WindowStyle 'None'  -BackgroundColor '#b2b2b2'  -MinWidth 350 -Buttons 'Exit', 'Go' -CancelButton 'Exit' -DefaultButton 'Go' -Prompt @(
  (New-AnyBoxPrompt -Message 'ת������' -ValidateSet '��Ƶ[mp4]', '��Ƶ[m4a]', '��Ƶ[mp3]' -DefaultValue '��Ƶ[m4a]' -ShowSetAs 'Radio_Wide' -Name  'convertype'  -ShowSeparator),
  (New-AnyBoxPrompt -InputType 'FileOpen' -Message 'Դ�ļ�:'  -Name  'filepath' -ValidateNotEmpty -ReadOnly),
  (New-AnyBoxPrompt -InputType 'FolderOpen' -Message '���[Ĭ�ϵ�ǰ�ļ���]:' -Name  'dstfolder' -ReadOnly )

)
if($result.Exit){exit}
if($result.Go){
    $convertype = $result.convertype
    if(-not $convertype){$convertype="��Ƶ[m4a]"}
    $filepath = $result.filepath
    if(-not $filepath){
        "��ѡ��Դ�ļ�"
        exit
    }
    
    if($result.dstfolder){
        $folder = $result.dstfolder
    }
    $matchs = $filepath.split("\")
    if(-not $matchs){
        "Դ�ļ���ʽ��֧�֣�"
        exit
    }
    $filename = $matchs[$matchs.Length-1]
    $matchs = $filename.split(".")
    $filetype = $matchs[$matchs.Length-1]
    $dst_filename = $filename.replace(".$filetype",'')
    
    if($extensions.Contains($filetype)){
        "��Ƶ��ʽת����[ $filetype - $convertype]"
        "���λ�ã�[ $folder ] "
        "��ǰ�����ļ���[$filepath]"
        if ( $convertype -eq "��Ƶ[m4a]" ) { 
            ffmpeg.exe -i $filepath  -c:a aac -q:a 1   "$folder/$dst_filename.m4a" -loglevel error   
        }
        elseif ( $convertype -eq '��Ƶ[mp4]' ) { 
            
            ffmpeg.exe -i $filepath  -c:v copy -c:a copy -y  "$folder/$dst_filename.mp4" -loglevel error  
        }
        elseif ( $convertype -eq '��Ƶ[mp3]' ) { 
            
            ffmpeg.exe -i $filepath   -acodec libmp3lame -q:a 1  "$folder/$dst_filename.mp3" -loglevel error  
        }
        else{
            "��֧�ֵĸ�ʽ��$convertype"
        }
        "ת�����!"
    }
    
    
}
