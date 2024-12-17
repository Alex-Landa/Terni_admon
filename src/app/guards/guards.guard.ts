import { Injectable } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';

export const guardsGuard: CanActivateFn = (route, state) => {
  return true;
};
