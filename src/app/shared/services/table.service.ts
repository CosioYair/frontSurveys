import { Injectable } from '@angular/core';
import { TableColumn } from '../model/table-column';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  public search(records: any[], text: string, columns: TableColumn[]): any[] {
    const keys = columns.map(column => column.key);
    const term = text.toLowerCase();
    return records.filter(record => {
      return keys.some(key => (record[key]).toString().toLowerCase().includes(term));
    });
  }

  public pagination(records: any[], page: number, pageSize: number): any[] {
    return records.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
  }
}
