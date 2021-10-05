export class PatternValidation{
    static firstNamePattern = "(^[A-Z]{1}[a-z]{1,17}$)|(^[А-Я]{1}[а-я]{1,16}$)";
    static lastNamePattern = "(^[A-Z]{1}[a-z]{1,17}$)|(^[А-Я]{1}[а-я]{1,16}$)";
    static countryPattern = "^[A-Z]{1}[a-z]{2}[-a-z]{1}([A-Za-z]{0,1})?([a-z]{0,11})?([-a-z]{0,1})?([A-Za-z]{0,1})?([a-z]{0,18})?$";
    static regionPattern = "(^[A-Z]{1}[a-z]{1,14}( [a-z]{2,15})?$)|(^[А-Я]{1}[а-я]{1,14}( [а-я]{0,2})?( [а-я]{14})?$)";
    static cityPattern = "(^[A-Z]{1}[a-z]{1,14}( [a-z]{2,15})?$)|(^[А-Я]{1}[а-я]{1,14}( [а-я]{0,2})?( [а-я]{14})?$)";
    static districtPattern = "(^[A-Z]{1}[a-z]{1,17}([-]{0,1})?([A-Z]{0,1})?([a-z]{0,17})?( [A-Z]{1})?([a-z]{1})?$)|(^[А-Я]{1}[а-я]{1,16}([-]{0,1})?([А-Я]{0,1})?([а-я]{0,16})?( [А-Я]{1})?([а-я]{1})?$)";
    static streetPattern = "^[A-ZА-Я]{1}[a-zа-яі]{1}[a-zа-я]{1}([-a-zа-я]{0,1})?([A-Za-zа-яі]{0,1})?([-a-zа-я]{0,1})?([a-zА-Яа-я]{0,1})?([a-zа-я]{0,1})?([і]{0,1})?([а-я]{0,2})?( [A-ZА-Я]{1})?([a-zа-я]{1})?([a-zі]{1})?([a-zа-я]{1})?([а-я]{0,1})?,[0-9]{1}([0-9a-zа-я]{0,1})?([0-9]{0,3})?([0-9a-z]{0,1})?([а-я]{0,1})?$";
    static buildingPattern = "^[0-9]{1}([0-9a-z]{0,3})?([0-9]{0,2})?([a-z]{0,1})?$";
    static postalCodePattern = "^[0-9]{5}$";
    static ipnPattern = "^[0-9]{10}$";
    static serviceNumberPattern = "^[0-9]{10}$";
    static jobPositionPattern = "(^[A-Z]{1}[a-z]{1,17}( [a-z]{17})?$)|(^[А-Я]{1}[а-я]{1,16}( [а-я]{16})?$)";
    static licenseSerialNumberPattern = "^[A-ZА-Я]{3}[0-9]{6}$";
    static userCategoriesPattern = "^[A-Z]{1}([0-9A-Z]{0,1})?([A-Z]{0,1})?$";
    static issuedByPattern = "^[0-9]{4}$";
}