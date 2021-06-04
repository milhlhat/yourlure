package com.example.demo.entity;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Builder
@Table(name = "tbl_Campaign")
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {

    @Id
    @Column(name = "campaignID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long campaignID;

    @Nullable
    @Column(name = "description")
    private String description;

    @Nullable
    @Column(name = "startDate")
    private Date startDate;

    @Nullable
    @Column(name = "endDate")
    private Date endDate;

    @Nullable
    @Column(name = "banner")
    private String banner;
}
