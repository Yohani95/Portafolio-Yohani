import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SEOService, AnalyticsService, environment } from '@portfolio-nx/data-access';

@Component({
  selector: 'lib-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private seoService = inject(SEOService);
  private analyticsService = inject(AnalyticsService);
  private platformId = inject(PLATFORM_ID);

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

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loading.set(true);

    // Envío real a Formspree
    this.submitToFormspree().subscribe({
      next: () => {
        this.loading.set(false);
        this.successMessage.set('¡Mensaje enviado exitosamente! Te responderé pronto. 📧');
        this.analyticsService.trackContactSubmission('success');
        this.contactForm.reset();
        this.submitted.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Error al enviar formulario:', error);
        this.errorMessage.set(
          'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctame directamente a yohani95301@gmail.com'
        );
        this.analyticsService.trackContactSubmission('error');
      },
    });
  }

  private submitToFormspree() {
    // Validar que el formspreeFormId esté configurado
    if (!environment.formspreeFormId || environment.formspreeFormId === 'PENDING_SETUP') {
      console.error('❌ FORMSPREE_FORM_ID no configurado');
      throw new Error(
        'Formulario de contacto no configurado. Por favor, contacta directamente a yohani95301@gmail.com'
      );
    }

    const formspreeUrl = `https://formspree.io/f/${environment.formspreeFormId}`;

    console.log('📧 Enviando formulario a:', formspreeUrl);

    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message,
      _replyto: this.contactForm.value.email,
      _subject: `Nuevo mensaje de ${this.contactForm.value.name}: ${this.contactForm.value.subject}`,
    };

    return this.http.post(formspreeUrl, formData);
  }
}
