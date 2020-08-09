import {Subject} from "rxjs";

export class UIService{
  loadingStateChanged: Subject<boolean> = new Subject<boolean>();
}
