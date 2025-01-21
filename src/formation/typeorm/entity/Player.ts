import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'player' })
export class Formation {
  @Index({ unique: true })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  formationId: string;

  @Column()
  formationName: string;

  @Column()
  type: string;

  @Column({ unique: true })
  email: string;
}
