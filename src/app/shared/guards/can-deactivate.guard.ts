import { CanDeactivateFn } from '@angular/router';
import DetalheChurrascoComponent from '../../pages/detalhe-churrasco/detalhe-churrasco.component';

export const canDeactivateGuard: CanDeactivateFn<DetalheChurrascoComponent> = (component, currentRoute, currentState, nextState) => {
  console.log(component.paramId);
  return confirm('Deseja sair do formulário?');
};
