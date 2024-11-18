import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResizableModule } from 'angular-resizable-element';
import { AngularSplitModule } from 'angular-split';
import { MatIcon } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EditorConfig } from '@ckeditor/ckeditor5-core';

@Component({
  selector: 'app-send-mail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ResizableModule,
    AngularSplitModule,
    MatIcon,
    DragDropModule,
  ],
  animations: [
    trigger('dragAnimation', [
      state('dragging', style({
        opacity: 0.5,
        transform: 'scale(1.1)',
      })),
      state('idle', style({
        opacity: 1,
        transform: 'scale(1)',
      })),
      transition('idle <=> dragging', [
        animate('200ms ease-in-out')
      ]),
    ]),
  ],
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements AfterViewInit {
  email = {
    subject: '',
    body: ''
  };
  leftPanelSize = 40; // Left panel initially takes 40% of the space
  editorConfig: EditorConfig = {
    toolbar: [
      'bold',
      'italic',
      'underline',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'imageUpload',
      'mediaEmbed'
    ]
  };

  public Editor: any;  // Placeholder for CKEditor

  templates = [
    { name: 'Template 1', content: '<h1>Template 1</h1>' },
    { name: 'Template 2', content: '<h2>Template 2</h2>' },
    { name: 'Template 3', content: '<p>Template 3 content</p>' }
  ];

  dragStates = this.templates.map(() => 'idle');
  
  // Flag to track if CKEditor is ready
  isEditorReady = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Only load CKEditor in the browser (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      // Dynamically import CKEditor after the component has been initialized
      import('@ckeditor/ckeditor5-build-classic').then((ckeditor) => {
        this.Editor = ckeditor;  // Assign the CKEditor to the class variable
        this.isEditorReady = true;  // Set the flag to true, meaning it's ready
      }).catch((err) => {
        console.error('CKEditor failed to load:', err);
      });
    }
  }

  drop(event: any) {
    const droppedTemplate = event.item.data;
    this.email.body += droppedTemplate.content;
  }

  togglePanel() {
    this.leftPanelSize = this.leftPanelSize === 40 ? 60 : 40;
  }

  onDragStart(index: number) {
    this.dragStates[index] = 'dragging'; 
  }

  onDragEnd(index: number) {
    this.dragStates[index] = 'idle'; 
  }
}
