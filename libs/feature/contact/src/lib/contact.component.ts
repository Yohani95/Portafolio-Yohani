import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SEOService } from '@portfolio-nx/data-access';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SEOService);

  contactForm: FormGroup;
  submitted = signal(false);
  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    // SEO para la página de contacto
    this.seoService.updateSEO({
      title: 'Contacto - Yohani Espinoza | Full Stack Developer',
      description:
        'Contáctame para oportunidades laborales, proyectos o consultas. Disponible en Santiago, Chile. Email: yohani95301@gmail.com',
      keywords: 'contacto, email, trabajo, oportunidades, freelance, consultoría, Santiago',
      type: 'website',
    });
  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get message() {
    return this.contactForm.get('message');
  }

  onSubmit(): void {
    this.submitted.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.contactForm.invalid) {
      return;
    }

    this.loading.set(true);

    // Simulación de envío (aquí iría la llamada al API)
    setTimeout(() => {
      this.loading.set(false);
      this.successMessage.set('¡Mensaje enviado exitosamente! Te responderé pronto.');
      this.contactForm.reset();
      this.submitted.set(false);
    }, 1500);
  }
}
