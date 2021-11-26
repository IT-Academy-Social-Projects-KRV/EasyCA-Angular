import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NzImage } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ViewFile } from 'src/app/models/ViewFile';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})

export class FileViewComponent implements OnInit {
  @Input() fileIdList: string[];
  images: ViewFile[] = [];

  constructor(private fileService: FileService, private msg: NzMessageService) { }

  ngOnInit(): void {
    this.handleDownload();
  }

  handleDownload() {
    if (this.fileIdList == null || this.fileIdList.length == 0) {
      this.msg.error("No ids in list");
    }
    else {
      this.fileService.downloadFiles(this.fileIdList).subscribe(
        data => {
          this.images.push(...data);
        },
        err => {
          this.msg.error(err);
        }
      )
    }
  }
}
