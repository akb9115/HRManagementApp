import { ISODatePipe } from './iso-date.pipe';

describe('ISODatePipe', () => {
  it('create an instance', () => {
    const pipe = new ISODatePipe();
    expect(pipe).toBeTruthy();
  });
});
