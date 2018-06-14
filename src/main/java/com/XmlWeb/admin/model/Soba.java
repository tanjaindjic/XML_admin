package com.XmlWeb.admin.model;


import javax.persistence.*;
import java.util.List;

@Entity
public class Soba {

    @Id
    @GeneratedValue
    private Long id;

    private int brojLezaja;

    @ManyToMany
    private List<DodatneUsluge> opcija;

    @ManyToOne
    private KategorijaSmestaja kategorija;

    @OneToMany
    private List<Iznajmljivanje> iznajmljivanja;

    @OneToMany
    private List<Rezervacija> rezervisano;

    @OneToMany
    private List<Cenovnik> cene;

    public Soba() {
    }


    public List<Rezervacija> getRezervisano() {
        return rezervisano;
    }

    public void setRezervisano(List<Rezervacija> rezervisano) {
        this.rezervisano = rezervisano;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getBrojLezaja() {
        return brojLezaja;
    }

    public void setBrojLezaja(int brojLezaja) {
        this.brojLezaja = brojLezaja;
    }

    public List<DodatneUsluge> getOpcija() {
        return opcija;
    }

    public void setOpcija(List<DodatneUsluge> opcija) {
        this.opcija = opcija;
    }

    public KategorijaSmestaja getKategorija() {
        return kategorija;
    }

    public void setKategorija(KategorijaSmestaja kategorija) {
        this.kategorija = kategorija;
    }

    public List<Iznajmljivanje> getIznajmljivanja() {
        return iznajmljivanja;
    }

    public void setIznajmljivanja(List<Iznajmljivanje> iznajmljivanja) {
        this.iznajmljivanja = iznajmljivanja;
    }

    public List<Cenovnik> getCene() {
        return cene;
    }

    public void setCene(List<Cenovnik> cene) {
        this.cene = cene;
    }
}
