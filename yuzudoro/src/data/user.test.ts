import { describe, it, expect, beforeEach, vi } from 'vitest';
// import { defineConfig } from 'vite';

import { User } from './user';

vi.mock('localStorage');



describe('Creates user', () => {
  let user:User;




  beforeEach(() => {
    user = new User('localuser');
    vi.spyOn(localStorage, 'getItem').mockReturnValue('test secret');

  })
  it('creates the user', () => {
    expect(user.tasks[0].title).toBe('Studying');
  })
})