import { Config } from "../models/config.js";

export class MimeTypesValidator {
  private _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  hasAllowedMimeType = (file: File): boolean => this._config.allowedMimeTypes.includes(file.type);
}
