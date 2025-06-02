import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddressService } from 'src/app/core/services/address.service';
import { PartnerService } from 'src/app/core/services/partner.service';
import { District, Province, Ward } from 'src/app/models/partner';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {
  partners: any;
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  isVisibleEditModal = false;
  isVisibleDeleteModal = false;

  constructor(private Partner: PartnerService, private router: Router, private Address: AddressService) { }

  getAll() {
    this.Partner.getList().subscribe({
      next: (res: any) => {
        this.partners = res;
      }
    }
    );
  }

  ngOnInit(): void {
    this.getAll();
    this.Address.getProvinces().subscribe(data => {
      this.provinces = data;
    });
  }

  submitAdd() {
    this.router.navigate(["/partner/partneradd"]);
  }

  showEditModal(): void {
    this.isVisibleEditModal = true;
  }

  hideEditModal(): void {
    this.isVisibleEditModal = false;
  }

  showDeleteModal() {
    this.isVisibleDeleteModal = true;
  }

  hideDeleteModal() {
    this.isVisibleDeleteModal = false;
  }

  onProvinceChange(province: { code: number, name: string }) {
    this.wards = [];
    this.districts = [];
    this.editForm.patchValue({ district: null, ward: null });
    this.Address.getDistricts(province.code).subscribe(res => {
      this.districts = res.districts;
    });
  }

  onDistrictChange(districtCode: { code: number, name: string }) {
    this.wards = [];
    this.editForm.patchValue({ ward: null });
    this.Address.getWards(districtCode.code).subscribe(res => {
      this.wards = res.wards;
    });
  }

  editForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    province: new FormControl('null'),
    district: new FormControl('null'),
    ward: new FormControl('null'),
    detail: new FormControl('')
  })

  get name() { return this.editForm.get('name') }

  getIdEdit(id: number) {
    this.Partner.getById(id).subscribe({
      next: (res: any) => {
        this.editForm.patchValue({
          is: res.id,
          province: res.province
        });

        this.Address.getDistricts(res.province).subscribe({
          next: (data) => {
            this.districts = data.districts
            console.log(data)
          }
        });

        this.editForm.patchValue({
          district: res.district
        });

        this.Address.getWards(res.district).subscribe({
          next: (data) => {
            this.wards = data.wards
            console.log(data)
          }
        });

        this.editForm.patchValue({
          id: res.id,
          name: res.name,
          ward: res.ward,
          detail: res.detail
        });
      }
    });
  }

  onUpdate(): void {
    if (this.editForm.valid) {
      this.Partner.update(this.editForm.value.id, this.editForm.value).subscribe(() => {
        this.getAll();
        this.editForm.reset();
        this.hideEditModal();
      }
      )
    }
  }

  idDelete: number = 0;
  nameDelete: string = '';

  getIdDelete(id: number) {
    this.idDelete = id;
  }

  getNameDelete(name: string) {
    this.nameDelete = name;
  }

  onDelete() {
    this.Partner.delete(this.idDelete).subscribe(() => {
      this.getAll();
      this.hideDeleteModal();
    })
  }

  lockPartner(partner: any) {
    this.Partner.lock(partner.id, !partner.status).subscribe(() => {
      partner.status = !partner.status;
      this.getAll();
    })
  }
}



