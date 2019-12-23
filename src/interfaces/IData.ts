import { VorteModuleOptions } from "../structures/Module";

export interface ICommandOptions extends VorteModuleOptions {
  /**
   * Alias(es)
   * @type {string[]} Command aliases
   */
  aliases?: string[];

  /**
   * Description
   * @type {string}
   */
  description?: string;

  /**
   * Usage
   * @type {string}
   */
  usage?: string;

  /**
   * Category
   * @type {string}
   */
  category: string;
  /**
* Example
* @type {string}
*/
  example?: string;
  /**
* Cooldown
* @type {number}
*/
  cooldown: number;
}