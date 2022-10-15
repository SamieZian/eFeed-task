import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PincodeService } from 'src/app/services/pincode.service';
import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

interface District {
  value: string;
  viewValue: string;
}

interface States {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  districts: District[] = [];
  states: States[] = [
    { value: "Andhra Pradesh", viewValue: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", viewValue: "Arunachal Pradesh" },
    { value: "Assam", viewValue: "Assam" },
    { value: "Bihar", viewValue: "Bihar" },
    { value: "Chhattisgarh", viewValue: "Chhattisgarh" },
    { value: "Goa", viewValue: "Goa" },
    { value: "Gujarat", viewValue: "Gujarat" },
    { value: "Haryana", viewValue: "Haryana" },
    { value: "Himachal Pradesh", viewValue: "Himachal Pradesh" },
    { value: "Jammu and Kashmir", viewValue: "Jammu and Kashmir" },
    { value: "Jharkhand", viewValue: "Jharkhand" },
    { value: "Karnataka", viewValue: "Karnataka" },
    { value: "Kerala", viewValue: "Kerala" },
    { value: "Madhya Pradesh", viewValue: "Madhya Pradesh" },
    { value: "Maharashtra", viewValue: "Maharashtra" },
    { value: "Manipur", viewValue: "Manipur" },
    { value: "Meghalaya", viewValue: "Meghalaya" },
    { value: "Mizoram", viewValue: "Mizoram" },
    { value: "Nagaland", viewValue: "Nagaland" },
    { value: "Odisha", viewValue: "Odisha" },
    { value: "Punjab", viewValue: "Punjab" },
    { value: "Rajasthan", viewValue: "Rajasthan" },
    { value: "Sikkim", viewValue: "Sikkim" },
    { value: "Tamil Nadu", viewValue: "Tamil Nadu" },
    { value: "Telangana", viewValue: "Telangana" },
    { value: "Tripura", viewValue: "Tripura" },
    { value: "Uttar Pradesh", viewValue: "Uttar Pradesh" },
    { value: "Uttarakhand", viewValue: "Uttarakhand" },
    { value: "West Bengal", viewValue: "West Bengal" },
  ];

  constructor(private formBuilder: FormBuilder, private pincodeService: PincodeService, private router: Router, private route: ActivatedRoute) {
    this.registrationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address1: [null, Validators.required],
      address2: [null],
      dob: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      pincode: [null, Validators.required],
      state: [null, Validators.required],
      district: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    let calculatedDate = this.getDate(this.registrationForm.get('dob')?.value);
    this.registrationForm.get('dob')?.setValue(calculatedDate)
    this.router.navigate(['/home'], {
      queryParams: { data: JSON.stringify(this.registrationForm.value) },
    })
  }

  public valuechange($event: any) {
    if ($event.target.value.length === 6) {
      this.pincodeService.findPincodeState($event.target.value).subscribe((pincodeState: any[]) => {
        if (pincodeState[0]['Status'] === 'Success') {
          this.registrationForm.get('state')?.setValue(pincodeState[0]['PostOffice'][0]['State']);
          this.registrationForm.get('district')?.setValue(pincodeState[0]['PostOffice'][0]['District']);
          this.districts.push({ value: pincodeState[0]['PostOffice'][0]['District'], viewValue: pincodeState[0]['PostOffice'][0]['District'] },);
        }
      });
    } else {
      this.registrationForm.get('district')?.setValue("");
      this.registrationForm.get('state')?.setValue("");
      this.districts = [];
    }
  }

  public dateSelector() {
    let calculatedAge = this.getAge(this.registrationForm.get('dob')?.value);
    this.registrationForm.get('age')?.setValue(calculatedAge);
  }

  public getDate(dateString: string) {
    var birthDate = new Date(dateString);
    return `${birthDate.getDate()}/${birthDate.getMonth()}/${birthDate.getFullYear()}`
  }

  public getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
