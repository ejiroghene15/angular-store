import {Component, signal} from '@angular/core';
import {email, form, FormField, FormRoot, required} from '@angular/forms/signals';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [
    FormField,
    ReactiveFormsModule,
    FormRoot
  ],
  selector: 'app-forms',
  styleUrl: './forms.css',
  templateUrl: './forms.html',
})
export class Forms {
  profileModel = signal({
    name: '',
    email: '',
    bio: ''
  })

  profileFormGroup = new FormGroup({
  email : new FormControl('')
  })

  updateSoem = () => {
    // this.profileFormGroup.setValue({email: ""})
    // this.profileModel.set({
    //   name: '', bio: '', email: ''
    // });

    // this.profileForm.bio().value.set('')
    console.log(this.profileFormGroup.value)
  }


  profileForm = form(this.profileModel, (path) => {
    required(path.email)
  })

  protected readonly email = email;
}
