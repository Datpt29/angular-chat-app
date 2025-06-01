import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address.service';
import { PartnerService } from 'src/app/core/services/partner.service';
import { District, Province, Ward } from 'src/app/models/partner';
import { Package } from 'src/app/models/servicePackage';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit {
  step = 1;
  subStep = 1;
  currency: string = "VNĐ";
  packages: Package[];
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];

  constructor(private route: Router, private Address: AddressService, private Partner: PartnerService) {
    this.packages = [
      {
        name: "Trải nghiệm",
        cost: "Miễn phí",
        desc: "Miễn phí sử dụng các tính năng cơ bản với thời hạn 1 tháng",
        pros: [
          { id: 1, value: "Tích hợp đa nền tảng" },
          { id: 2, value: "Lập lịch chăm sóc" },
          { id: 3, value: "Quảng cáo facebook" }
        ],
        cons: [
          { id: 1, value: "Giới hạn 5 ứng dụng" },
          { id: 2, value: "Giới hạn 15 nhân viên" }
        ],
        img: './assets/img/pkg-img1.svg',
        isSelected: false
      },
      {
        name: "Cơ bản",
        cost: "500.000",
        desc: "Quản lý khách hàng một cách dễ dàng và nhiều tính năng mở rộng",
        pros: [
          { id: 1, value: "Tích hợp đa nền tảng" },
          { id: 2, value: "Lập lịch chăm sóc" },
          { id: 3, value: "Quảng cáo facebook" }
        ],
        cons: [
          { id: 1, value: "Giới hạn 15 ứng dụng" },
          { id: 2, value: "Giới hạn 50 nhân viên" }
        ],
        img: './assets/img/pkg-img1.svg',
        isSelected: true
      },
      {
        name: "Tiêu chuẩn",
        cost: "2.000.000",
        desc: "Mở rộng báo cáo, cung cấp nhiều tính năng nội bộ",
        pros: [
          { id: 1, value: "Chatbot marketing" },
          { id: 2, value: "Tự động đề xuất sản phẩm" },
          { id: 3, value: "Quy trình nội bộ tự động" },
          { id: 4, value: "Tạo đánh giá sau mua hàng" },
        ],
        cons: [
          { id: 1, value: "Quản lý khách hàng tập trung và thông minh theo đặc thù ngành nghề" },
          { id: 2, value: "Giới hạn 50 ứng dụng" },
          { id: 3, value: "Giới hạn 150 nhân viên" },
        ],
        img: './assets/img/pkg-img1.svg',
        isSelected: false
      },
      {
        name: "Nâng cao",
        cost: "5.000.000",
        desc: "Mở khóa toàn bộ tính năng của ứng dụng",
        pros: [
          { id: 1, value: "Không giới hạn page" },
          { id: 1, value: "Không giới hạn ứng dụng" },
          { id: 1, value: "Không giới hạn khách hàng" },
          { id: 1, value: "Tích hợp hệ thống doanh nghiệp" },
          { id: 1, value: "Không giới hạn nhân viên" },
        ],
        cons: [
        ],
        img: './assets/img/pkg-img2.svg',
        isSelected: false
      },
    ]
  }

  ngOnInit(): void {
    this.Address.getProvinces().subscribe(data => {
      this.provinces = data;
    });

    this.phone?.valueChanges.subscribe((value: string) => {
      if (!value) return;

      let formatted = value;
      if (value.length === 10) {
        formatted = `${value.slice(0, 3)} - ${value.slice(3, 6)} - ${value.slice(6)}`;
      }

      if (formatted !== value) {
        this.phone?.setValue(formatted, { emitEvent: false });
      }
    });
  }

  stepIncrease(): void {
    this.step++;
    this.subStep++;
  }

  subStepIncrease(): void {
    this.subStep++;
  }

  cancel(): void {
    this.route.navigate(['/partner/partnerlist']);
  }

  types = [
    { name: 'Công ty cổ phần' },
    { name: 'Công ty TNHH' }
  ]


  fields = [
    { name: 'Sản phẩm điện tử' },
    { name: 'Gia dụng' },
    { name: 'Kinh doanh online' },
    { name: 'Bán lẻ' },
    { name: 'Dịch vụ' },
    { name: 'Bất động sản' },
    { name: 'Tài chính' }
  ]

  onProvinceChange(province: { code: number, name: string }) {
    this.wards = [];
    this.districts = [];
    this.addForm1.patchValue({ district: null, ward: null });
    this.Address.getDistricts(province.code).subscribe(res => {
      this.districts = res.districts;
    });
  }

  onDistrictChange(districtCode: { code: number, name: string }) {
    this.wards = [];
    this.addForm1.patchValue({ ward: null });
    this.Address.getWards(districtCode.code).subscribe(res => {
      this.wards = res.wards;
    });
  }

  addForm1: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl(null, Validators.required),
    field: new FormControl(null, Validators.required),
    province: new FormControl(null),
    district: new FormControl(null),
    ward: new FormControl(null),
    detail: new FormControl('')
  });

  get name() { return this.addForm1.get('name') }
  get phone() { return this.addForm1.get('phone') }
  get email() { return this.addForm1.get('email') }
  get type() { return this.addForm1.get('type') }
  get field() { return this.addForm1.get('field') }

  onCreate() {
    if (this.addForm1.valid) {
      this.subStepIncrease();
      this.stepIncrease();
    }
  }

  addForm2: FormGroup = new FormGroup({
    duration: new FormControl('month'),
    servicePackage: new FormControl('Cơ bản')
  });

  get duration() { return this.addForm2.get('duration')?.value }

  selectPackage(packageName: string, selectedIndex: number): void {
    this.stepIncrease();
    this.packages.forEach((pkg, index) => {
      pkg.isSelected = index === selectedIndex;
    });
    this.addForm2.patchValue({
      servicePackage: packageName
    });
  }

  onSubmit() {
    if (this.addForm1.valid && this.addForm2.valid) {
      const data = {
        ...this.addForm1.value,
        ...this.addForm2.value
      };
      this.Partner.create(data).subscribe({
        next: (res: any) => {
          this.addForm1.reset;
          this.addForm2.reset;
          this.route.navigate(['partner/partnerlist']);
        }
      })
    }
  }


}
