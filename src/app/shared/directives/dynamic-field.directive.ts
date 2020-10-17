import { Directive, ComponentFactoryResolver,
          Input,
          OnInit,
          ViewContainerRef } from '@angular/core';
import { FieldConfig } from '../interfaces/field.interface';
import { FormGroup } from '@angular/forms';
import { DynamicFormElementsComponent } from '../components/dynamic-form-elements/dynamic-form-elements.component';

const componentMapper = {
  input: DynamicFormElementsComponent,
  button: DynamicFormElementsComponent,
  label:DynamicFormElementsComponent,
  image:DynamicFormElementsComponent
};
@Directive({
  selector: '[intgDynamicField]',
  exportAs:'[intgDynamicField]'
})


export class DynamicFieldDirective implements OnInit {

  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
  }
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]

    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
