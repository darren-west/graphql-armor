import {
  ValidationContext,
  FieldNode,
  ASTVisitor,
  GraphQLError,
} from 'graphql';
import { ArmorPlugin } from '../ArmorPlugin';
import { ValidationRule } from '../types';

function secureIntrospectionPlugin(context: ValidationContext): ASTVisitor {
  return {
    Field(node: FieldNode) {
      // ToDo: Whitelist headers pairs
      const blacklist = ['__schema', '__type'];
      if (blacklist.includes(node.name.value)) {
        context.reportError(new GraphQLError('Introspection is disabled'));
      }
    },
  };
}

export class IntrospectionPlugin extends ArmorPlugin {
  getValidationRules(): ValidationRule[] {
    return [secureIntrospectionPlugin];
  }
}
