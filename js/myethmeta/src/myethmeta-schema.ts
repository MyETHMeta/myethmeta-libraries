// This file is generated from https://github.com/MyETHMeta/myethmeta-json-specification

/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Ethereum address metadata JSON schema
 */
export interface EthereumAddressMetadataJSONSchema {
  /**
   * The name of this Contact, suitable for display to end-users.
   */
  displayName?: string;
  /**
   * The broken-out components and fully formatted version of the contact's real name.
   */
  name?: {
    /**
     * The full name, including all middle names, titles, and suffixes as appropriate, formatted for display.
     */
    formatted?: string;
    /**
     * The family name of this Contact, or "Last Name" in most Western languages.
     */
    familyName?: string;
    /**
     * The given name of this Contact, or "First Name" in most Western languages.
     */
    givenName?: string;
    /**
     * The middle name(s) of this Contact.
     */
    middleName?: string;
    /**
     * The honorific prefix(es) of this Contact, or "Title" in most Western languages.
     */
    honorificPrefix?: string;
    /**
     * The honorifix suffix(es) of this Contact, or "Suffix" in most Western languages.
     */
    honorificSuffix?: string;
    [k: string]: unknown;
  };
  /**
   * The casual way to address this Contact in real life.
   */
  nickname?: string;
  /**
   * The birthday of this contact.
   */
  birthday?: string;
  /**
   * The gender of this contact.
   */
  gender?: string;
  /**
   * The preferred username of this contact on sites that ask for a username.
   */
  preferredUsername?: string;
  /**
   * URI of the user's avatar.
   */
  thumbnailUrl?: string;
  /**
   * List of photos of this contact.
   */
  photos?: {
    /**
     * URI of a photo of this contact.
     */
    value?: string;
    /**
     * Type of the photo.
     */
    type?: string;
    /**
     * A Boolean value indicating whether this instance of the Plural Field is the primary or preferred value of for this field.
     */
    primary?: boolean;
    [k: string]: unknown;
  }[];
  /**
   * List of e-mail addresses of this contact.
   */
  emails?: {
    /**
     * E-mail address of this contact.
     */
    value?: string;
    /**
     * A Boolean value indicating whether this instance of the Plural Field is the primary or preferred value of for this field.
     */
    primary?: boolean;
    [k: string]: unknown;
  }[];
  /**
   * Instant messaging addresses for this Contact.
   */
  ims?: {
    /**
     * Instant messaging address of this contact.
     */
    value?: string;
    /**
     * Type of IM service.
     */
    type?: string;
    /**
     * A Boolean value indicating whether this instance of the Plural Field is the primary or preferred value of for this field.
     */
    primary?: boolean;
    [k: string]: unknown;
  }[];
  /**
   * Online accounts held by this Contact.
   */
  accounts?: {
    /**
     * The top-most authoritative domain for this account, e.g. "twitter.com".
     */
    domain?: string;
    /**
     * An alphanumeric user name, usually chosen by the user.
     */
    username?: string;
    [k: string]: unknown;
  }[];
  /**
   * URLs of a web pages relating to this Contact.
   */
  urls?: {
    /**
     * URL of a webpage of this contact.
     */
    value?: string;
    /**
     * Type of the webpage.
     */
    type?: string;
    /**
     * A Boolean value indicating whether this instance of the Plural Field is the primary or preferred value of for this field.
     */
    primary?: boolean;
    [k: string]: unknown;
  }[];
  /**
   * A short introduction of this contact.
   */
  aboutMe?: string;
  [k: string]: unknown;
}
