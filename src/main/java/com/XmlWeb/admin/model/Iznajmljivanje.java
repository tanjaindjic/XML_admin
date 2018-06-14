package com.XmlWeb.admin.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Iznajmljivanje {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Soba soba;

    private Date datumOd;

    private Date datumDo;

    private Long cena;

    private Boolean mozePojedinacno;


    public Iznajmljivanje() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Soba getSoba() {
        return soba;
    }

    public void setSoba(Soba soba) {
        this.soba = soba;
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

    public Long getCena() {
        return cena;
    }

    public void setCena(Long cena) {
        this.cena = cena;
    }

    public Boolean getMozePojedinacno() {
        return mozePojedinacno;
    }

    public void setMozePojedinacno(Boolean mozePojedinacno) {
        this.mozePojedinacno = mozePojedinacno;
    }

}
