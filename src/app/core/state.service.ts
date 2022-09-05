import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export class StateService<T> {
  private notesState$: BehaviorSubject<T>;
  protected get notesState(): T {
    return this.notesState$.getValue();
  }

  constructor(initialnotesState: T) {
    this.notesState$ = new BehaviorSubject<T>(initialnotesState);
  }

  protected select<K>(mapFn: (notesState: T) => K): Observable<K> {
    return this.notesState$.asObservable().pipe(
      map((notesState: T) => mapFn(notesState)),
      distinctUntilChanged()
    );
  }

  protected setState(notesState: Partial<T>) {
    const maiState = notesState;
    this.notesState$.next({
      ...this.notesState,
      ...maiState,
    });
  }
}
