import { Path } from '@angular-devkit/core';

export interface DomainOptions {
  /**
   * The name of the loader.
   */
  name: string;
  /**
   * The name of the loader by.
   */
  by: string;
  /**
   * The path to create the loader.
   */
  path?: string | Path;
  /**
   * The source root path
   */
  sourceRoot?: string;
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
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * When true, "@nestjs/swagger" dependency is installed in the project.
   */
  isSwaggerInstalled?: boolean;
}
