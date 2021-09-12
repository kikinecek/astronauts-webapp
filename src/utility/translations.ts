/** Enum represents astronauts table texts */
export enum AstronautsTableTranslations {
  HEADER_NAME = "Name",
  HEADER_SURNAME = "Surname",
  HEADER_BIRTHDATE = "Birthdate",
  HEADER_SUPERPOWER = "Superpower",

  ADD_NEW_ASTRONAUT = "Add new astronaut",
  UPDATE_ASTRONAUT = "Update astronaut",
  REMOVE_ASTRONAUT = "Remove astronaut"
};

/** Enum represents texts for astronauts create dialog */
export enum AstronautsDialogTranslations {
  TITLE_CREATE = "CREATE NEW ASTRONAUT",
  TITLE_UPDATE = "UPDATE ASTRONAUT",
  LABEL_NAME = "Name",
  LABEL_SURNAME = "Surname",
  LABEL_BIRTHDATE = "Birthdate",
  LABEL_SUPERPOWER = "Superpower",
  LABEL_CREATED_AT = "Created",
  LABEL_UPDATED_AT = "Last update",
  BUTTON_SUBMIT = "Submit"
};

/** Basic validation translatios that are usually shared through all validations */
export enum BasicValidationTranslations {
  NON_EMPTY = "Field can not be empty!",
  STRING_MAX_20_CHAR = "Max text length is 20 characters!"
}