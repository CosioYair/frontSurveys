import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any;
	public collapseSidebar = false;
	public GeneralMenuItems: Menu[] = [
		{
			title: 'Nuestra solución',
			icon: 'home',
			type: 'link',
			badgeType: 'primary',
			active: false,
			path: '/'
		},
	];
	private filteredMenuItems: Menu[] = this.GeneralMenuItems.slice(0);
	public items = new BehaviorSubject<Menu[]>(this.filteredMenuItems);

	constructor(private _ngxPermissionsService: NgxPermissionsService) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true;
		}
		this._ngxPermissionsService.permissions$.subscribe(permissions => {
			this.filteredMenuItems = this.GeneralMenuItems.slice(0);
			if (permissions['PE']) {
				this.filteredMenuItems.push({
					title: 'Empresa', icon: 'briefcase', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/company/update', title: 'Datos generales', type: 'link' },
						{ path: '/user/company/new-employee', title: 'Alta de empleados', type: 'link' },
						{ path: '/user/company/employees', title: 'Mis empleados', type: 'link' },
					]
				});
			}
			if (permissions['SS']) {
				this.filteredMenuItems.push({
					title: 'Evaluaciones', icon: 'activity', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/evaluation', title: 'Dashboard', type: 'link' },
						{ path: '/user/evaluation/new-evaluation', title: 'Habilitar evaluación', type: 'link' },
						{ path: '/user/evaluation/evaluation-enabled-list', title: 'Evaluaciones habilitadas', type: 'link' },
					]
				}, {
					title: 'Categorias', icon: 'bookmark', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/category/create', title: 'Crear', type: 'link' },
						{ path: '/user/category/list', title: 'Mis categorias', type: 'link' },
					]
				}, {
					title: 'Dominios', icon: 'bookmark', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/domain/create', title: 'Crear', type: 'link' },
						{ path: '/user/domain/list', title: 'Mis dominios', type: 'link' },
					]
				}, {
					title: 'Dimensiones', icon: 'bookmark', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/dimension/create', title: 'Crear', type: 'link' },
						{ path: '/user/dimension/list', title: 'Mis dimensiones', type: 'link' },
					]
				}, {
					title: 'Preguntas', icon: 'bookmark', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/question/create', title: 'Crear', type: 'link' },
						{ path: '/user/question/list', title: 'Mis preguntas', type: 'link' },
					]
				}, {
					title: 'Secciones', icon: 'bookmark', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/survey-section/create', title: 'Crear', type: 'link' },
						{ path: '/user/survey-section/list', title: 'Mis secciones', type: 'link' },
					]
				});
			}
			if (permissions['PEM']) {
				this.filteredMenuItems.push({
					title: 'Mis evaluaciones', icon: 'activity', type: 'sub', badgeType: 'primary', active: false, children: [
						{ path: '/user/employee-evaluations', title: 'Evaluaciones activas', type: 'link' },
					]
				});
			}
			this.items.next(this.filteredMenuItems);
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}


}
