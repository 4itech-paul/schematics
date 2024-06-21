import { Path } from '@angular-devkit/core';

export interface DomainOptions {
  /**
   * The name of the loader.
   */
  name: string;
  /**
   * The path to create the loader.
   */
  path?: string | Path;
  /**
   * The source root path
   */
  sourceRoot?: string;
  /**
   * Application language.
   */
  language?: string;
  /**
   * Specifies if spec files are generated.
   */
  spec?: boolean;
  /**
   * Specifies the file suffix of spec files.
   * @default "spec"
   */
  specFileSuffix?: string;
  /**
   * The path to insert the module declaration.
   */
  module?: Path;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * The transport layer.
   */
  type?:
    | 'rest'
    | 'graphql-code-first'
    | 'graphql-schema-first'
    | 'microservice'
    | 'ws';
  /**
   * When true, CRUD entry points are generated.
   */
  crud?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * When true, "@nestjs/swagger" dependency is installed in the project.
   */
  isSwaggerInstalled?: boolean;
}
