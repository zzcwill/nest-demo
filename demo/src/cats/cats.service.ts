import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getList() {
		let arr = [
			{
				name: 'zzc',
				age: '10'
			},
			{
				name: 'zzc',
				age: '10'
			}		
		];
    return arr;
	}
}