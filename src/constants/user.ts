import moment from 'moment';

export class UserData {
  public static readonly firstName = 'Carlos';
  public static readonly lastName = 'Gonzalez';
  public static readonly nickName = 'Charly';
  public static readonly birthPlace = 'Mexicali, Baja California, Mexico';
  public static readonly currentLocation = 'San Diego, California';
  public static readonly currentTitle = 'Software Engineer';
  public static readonly currentRole = 'Frontend Developer';
  public static readonly currentCompany = 'Semantic AI';
  public static readonly currentCompanyWebsite = 'https://www.semantic-ai.com/';
  public static readonly birthDate = moment(
    '10/10/1992',
    'DD/MM/YYYY'
  ).toDate();
  public static readonly hobbies = [
    'learn new programming languages',
    'play video games',
  ];
}
