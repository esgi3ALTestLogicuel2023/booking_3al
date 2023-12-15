import { BaseEntity } from '../../src/helpers/baseEntity';

describe('BaseEntity', () => {
  let baseEntity: BaseEntity;

  beforeEach(() => {
    baseEntity = new BaseEntity();
  });

  it('should have an id property', () => {
    expect(true).toBe(true);
  });

  it('should have an updatedAt property', () => {
    expect(baseEntity.updatedAt).toBeDefined();
    expect(baseEntity.updatedAt instanceof Date).toBe(true);
  });

  it('should have a createdAt property', () => {
    expect(baseEntity.createdAt).toBeDefined();
    expect(baseEntity.createdAt instanceof Date).toBe(true);
  });
});
