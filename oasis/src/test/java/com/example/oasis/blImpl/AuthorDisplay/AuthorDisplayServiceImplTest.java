package com.example.oasis.blImpl.AuthorDisplay;

import com.example.oasis.OasisApplication;
import com.example.oasis.data.AuthorDisplay.AuthorDisplayMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(classes = OasisApplication.class)
@Transactional
class AuthorDisplayServiceImplTest {

    @Autowired
    private AuthorDisplayMapper authorDisplayMapper;
    @Autowired
    private AuthorDisplayServiceImpl authorDisplayService;

    @Test
    void searchTopTenPublicationAuthor() {
        Assertions.assertEquals(true,authorDisplayService.searchTopTenPublicationAuthor().getSuccess());
    }

    @Test
    void searchAuthorPortraitById() {
        Assertions.assertEquals(true,authorDisplayService.searchAuthorPortraitById(2).getSuccess());
    }

    @Test
    void searchAllAuthor() {
        Assertions.assertEquals(true,authorDisplayService.searchAllAuthor().getSuccess());
    }

    @Test
    void searchAuthorByName() {
        Assertions.assertEquals(true,authorDisplayService.searchAuthorByName("Y. Liu").getSuccess());
    }

    @Test
    void getAuthorHindexById() {
        Assertions.assertEquals(true,authorDisplayService.getAuthorHindexById(2).getSuccess());
    }

    @Test
    void getAuthorPartnersById() {
        Assertions.assertEquals(true,authorDisplayService.getAuthorPartnersById(2).getSuccess());
    }

    @Test
    void showRelationByAuthorId(){
        Assertions.assertEquals(true,authorDisplayService.showRelationByAuthorId(2).getSuccess());
    }

    @Test
    void showABRelation(){
        Assertions.assertEquals(true,authorDisplayService.showABRelation(2,3).getSuccess());
    }

}