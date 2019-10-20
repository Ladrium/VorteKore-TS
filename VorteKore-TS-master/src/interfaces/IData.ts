export interface IData {
  /**
* Command name
* @type {string} Command name
*/
  name: string;
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