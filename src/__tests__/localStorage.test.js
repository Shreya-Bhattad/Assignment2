import * as storage from '../modules/localStorage';

describe('localStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  it('saves and loads workspace', () => {
    const data = [{ id: '1', type: 'Text' }];
    storage.saveWorkspace(data);
    expect(storage.loadWorkspace()).toEqual(data);
  });
});
