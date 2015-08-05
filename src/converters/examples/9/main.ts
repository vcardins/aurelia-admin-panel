export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('resources'); // install our app's resources

  aurelia.start().then(a => a.setRoot());
}
