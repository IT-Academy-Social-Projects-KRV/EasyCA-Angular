import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadXHRArgs, NzUploadFile } from 'ng-zorro-antd/upload';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  @Output() fileIdListEvent = new EventEmitter<Array<string>>();
  fileIdList = new Array<string>();
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(private fileService: FileService, private msg: NzMessageService) { }

  ngOnInit(): void {
  }

  handleCustomUpload = (file: NzUploadXHRArgs) => {
    const formData = new FormData();
    formData.append(file.file.name, file.postFile as any);

    return this.fileService.uploadFile(formData).subscribe(
      data => {
        file.onSuccess!(data, file.postFile as any, file.headers!);
        this.fileIdList.push(...data.data);
        this.msg.success("Image uploaded!");
        this.fileIdListEvent.emit(this.fileIdList);
      },
      error => {
        file.onError!(error, file.postFile as any);
        this.msg.error(error);
        this.fileIdListEvent.emit(this.fileIdList);
      }).add();
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.fileService.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  handleRemove = (file: NzUploadFile) => {
    let index = this.fileList.indexOf(file);
    this.fileService.deleteFile(this.fileIdList[index]).subscribe(
      () => {
        this.msg.success("Image was deleted!");
        this.fileIdList.splice(index, 1);
        this.fileIdListEvent.emit(this.fileIdList);
      },
      err => {
        this.msg.error(err);
      }
    );
    return true;
  }
}
