import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import { LocalStorage } from './local.storage';

@Injectable()
export class UploadService {
    [x: string]: any;
    constructor(private ls: LocalStorage) {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer
        }).share();
    }

    public makeFileRequest(url: string, postData: any, files: File[], fieldname: string): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
            //formData 文件流追加
            for (let i = 0; i < files.length; i++) {
                formData.append(fieldname, files[i], files[i].name || "default.jpg");
            }
            //formData 参数追加
            if (postData !== "" && postData !== undefined && postData !== null) {
                for (var property in postData) {
                    if (postData.hasOwnProperty(property)) {
                        formData.append(property, postData[property]);
                    }
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(xhr.response);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);

                // this.progressObserver.next(this.progress);
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('guid', this.ls.getObject("USERINFO").Guid);
            xhr.send(formData);
        });
    }
}