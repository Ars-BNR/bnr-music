import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CollectionPlaylistService } from './collection-playlist.service';
import { CreateCollectionPlaylistDto } from './dto/create-collectionPlaylist.dto';
import { UpdateCollectionPlaylistDto } from './dto/update-collectionPlaylist.dto';

@Controller('collection_playlist')
export class CollectionPlaylistController {
  constructor(private collectionPlaylistService: CollectionPlaylistService) {}

  @Post()
  create(@Body() dto: CreateCollectionPlaylistDto) {
    return this.collectionPlaylistService.create(dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.collectionPlaylistService.delete(id);
  }

  @Patch('change/:id')
  change(
    @Param('id') id: number,
    @Body() updateData: UpdateCollectionPlaylistDto,
  ) {
    return this.collectionPlaylistService.change(id, updateData);
  }
}
