import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search-company-code',
	templateUrl: './search-company-code.component.html',
	styleUrls: ['./search-company-code.component.css']
})


export class SearchCompanyCodeComponent implements OnInit {

	@ViewChild('instance') instance!: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	companyCodes: string[] = [];
	model: any;

	constructor(private companyService: CompanyService, private router: Router) {
		
	}

	ngOnInit(): void {
		this.companyService.setCompanyCodeList();
		this.companyService.getCompanyCodeList.subscribe(companyCodeList => {
			this.companyCodes = companyCodeList;
		});
	}

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$).pipe(
			map((term) =>
				(term.length === 0 ? this.companyCodes : this.companyCodes.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};

	searchCompany() {
		this.companyService.setCompany(this.model);
		this.router.navigateByUrl(`/companycode/${this.model}`);
		this.model = '';
	}
}
