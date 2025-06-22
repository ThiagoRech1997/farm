import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AnimaisModule } from './animais/animais.module';
import { EspeciesModule } from './especies/especies.module';
import { RacasModule } from './racas/racas.module';
import { ReprodutoresModule } from './reprodutores/reprodutores.module';
import { NinhadasModule } from './ninhadas/ninhadas.module';
import { RelacionamentosModule } from './relacionamentos/relacionamentos.module';
import { VacinasModule } from './vacinas/vacinas.module';
import { PesagensModule } from './pesagens/pesagens.module';
import { HistoricoSaudeModule } from './historico-saude/historico-saude.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [DatabaseModule, AnimaisModule, EspeciesModule, RacasModule, ReprodutoresModule, NinhadasModule, RelacionamentosModule, VacinasModule, PesagensModule, HistoricoSaudeModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
