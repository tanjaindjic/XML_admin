package com.XmlWeb.admin.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class DodatneUsluge {

    @Id
    private Long id;

    private String opcija;

    public DodatneUsluge() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOpcija() {
        return opcija;
    }

    public void setOpcija(String opcija) {
        this.opcija = opcija;
    }
}
