package com.XmlWeb.admin.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class KategorijaSmestaja {

    @Id
    @GeneratedValue
    private Long id;

    private String kategorija;

    public KategorijaSmestaja() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKategorija() {
        return kategorija;
    }

    public void setKategorija(String kategorija) {
        this.kategorija = kategorija;
    }
}
