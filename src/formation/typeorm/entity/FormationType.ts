import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'formation-type' })
export class Formation {
  @Index({ unique: true })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  typeId: string;

  @Column()
  typeName: string;

  @Column()
  totalPlayer: string;

  @Column({ unique: true })
  state: string;
}
