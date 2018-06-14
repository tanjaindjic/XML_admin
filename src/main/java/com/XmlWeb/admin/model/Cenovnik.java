package com.XmlWeb.admin.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Cenovnik {

    @Id
    @GeneratedValue
    private Long id;

    private Long cena;

    private Date datumOd;

    private Date datumDo;

    public Cenovnik() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCena() {
        return cena;
    }

    public void setCena(Long cena) {
        this.cena = cena;
    }

    public Date getDatumOd() {
        return datumOd;
    }

    public void setDatumOd(Date datumOd) {
        this.datumOd = datumOd;
    }

    public Date getDatumDo() {
        return datumDo;
    }

    public void setDatumDo(Date datumDo) {
        this.datumDo = datumDo;
    }

}
